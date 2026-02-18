<template>
  <div class="p-textarea" :class="{ 'is-disabled': props.disabled }" :style="{ height: `${currentHeight}px` }">
    <div>
      <div v-if="isEmpty" class="p-textarea__placeholder">
        {{ props.placeholder }}
      </div>

      <div ref="editorRef" class="p-textarea__markup" contenteditable="true" role="textbox" aria-multiline="true"
        spellcheck="true" @input="handleInput" @keydown="handleKeydown" @paste="handlePaste"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const model = defineModel<string>({ required: true, default: '' });

interface Props {
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'submit', value: string): void;
}>();

const editorRef = ref<HTMLDivElement | null>(null);
const isEmpty = ref(true);

const MAX_HEIGHT = 475;
const MIN_HEIGHT = 56;
const currentHeight = ref(MIN_HEIGHT);

const ZWS = '\u200B';

const createSlateRow = (text = '') => {
  const div = document.createElement('div');
  div.setAttribute('data-slate-node', 'element');
  const content = text || ZWS;

  div.innerHTML = `
    <span data-slate-node="text">
      <span data-slate-leaf="true"><span data-slate-string="true">${content}</span></span>
    </span>`.replace(/>\s+</g, '><').trim();

  return div;
};

const ensureStructure = () => {
  if (!editorRef.value) return;

  if (editorRef.value.children.length === 0) {
    const row = createSlateRow();
    editorRef.value.appendChild(row);

    const textSpan = row.querySelector('[data-slate-string="true"]') as HTMLElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(textSpan.firstChild!, textSpan.innerText.length);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
};

const handleInput = () => {
  if (!editorRef.value) return;

  const rawText = editorRef.value.innerText;
  const cleanText = rawText.replace(/\u200B/g, '');

  isEmpty.value = cleanText.length === 0 || cleanText === '\n';

  model.value = cleanText;

  if (editorRef.value.childNodes.length === 0 || editorRef.value.innerText === '') {
    ensureStructure();
  }

  updateHeight();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (!model.value.trim()) return;
    emit('submit', model.value);
    return;
  }

  if (event.key === 'Enter' && event.shiftKey) {
    event.preventDefault();
    insertNewLine();
  }
};

const insertNewLine = () => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const newRow = createSlateRow();

  let currentRow = range.commonAncestorContainer as HTMLElement;
  while (currentRow && (currentRow.nodeType !== 1 || currentRow.getAttribute('data-slate-node') !== 'element')) {
    if (currentRow === editorRef.value) break;
    currentRow = currentRow.parentElement as HTMLElement;
  }

  if (currentRow && currentRow !== editorRef.value) {
    currentRow.after(newRow);
  } else {
    editorRef.value?.appendChild(newRow);
  }

  const target = newRow.querySelector('[data-slate-string="true"]');
  const newRange = document.createRange();
  newRange.setStart(target!.firstChild!, 1);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  handleInput();
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const text = event.clipboardData?.getData('text/plain') || '';
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (index > 0) insertNewLine();
    document.execCommand('insertText', false, line);
  });
};

const updateHeight = () => {
  if (!editorRef.value) return;
  const editor = editorRef.value;
  const contentHeight = editor.scrollHeight;

  let finalHeight = contentHeight;

  if (finalHeight > MAX_HEIGHT) {
    finalHeight = MAX_HEIGHT;
  }

  if (finalHeight < MIN_HEIGHT) {
    finalHeight = MIN_HEIGHT;
  }

  currentHeight.value = finalHeight;
};

watch(model, (newVal) => {
  if (newVal === '' && editorRef.value) {
    editorRef.value.innerHTML = '';
    ensureStructure();
    isEmpty.value = true;
  }
});

onMounted(() => {
  ensureStructure();
});
</script>

<style scoped lang="scss">
.p-textarea {
  position: relative;
  overflow: hidden auto;
  width: 100%;
  min-height: 3.5rem;
  padding: 0;
  box-sizing: border-box;
  color: var(--text-default);
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  line-height: 1.375rem;
  tab-size: 4;
  border: none;
  background-color: transparent;
  appearance: none;
  padding-inline: 0 10px;

  &__placeholder {
    position: absolute;
    overflow: hidden;
    min-height: 3.5rem;
    padding: calc((3.5rem - 1.375rem) / 2) 0;
    box-sizing: border-box;
    color: var(--text-secondary);
    text-overflow: ellipsis;
    white-space: nowrap;
    inset-inline: 0 10px;
  }

  &__markup {
    position: absolute;
    min-height: 3.5rem;
    padding: calc((3.5rem - 1.375rem) / 2) 0;
    box-sizing: border-box;
    color: var(--text-default);
    font-size: 1rem;
    line-height: 1.375rem;
    text-align: start;
    white-space: break-spaces !important;
    outline: none;
    overflow-wrap: break-word;
    inset-inline: 0 10px;
    caret-color: var(--text-default);
    user-select: text;
  }
}
</style>
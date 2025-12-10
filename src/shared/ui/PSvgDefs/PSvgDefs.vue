<template>
  <svg class="svg-defs-global" viewBox="0 0 1 1" aria-hidden="true">
    <defs>
      <mask id="svg-mask-rounded-square" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <path
          fill="white"
          d="M0 0.464C0 0.301585 0 0.220377 0.0316081 0.158343C0.0594114 0.103776 0.103776 0.0594114 0.158343 0.0316081C0.220377 0 0.301585 0 0.464 0H0.536C0.698415 0 0.779623 0 0.841657 0.0316081C0.896224 0.0594114 0.940589 0.103776 0.968392 0.158343C1 0.220377 1 0.301585 1 0.464V0.536C1 0.698415 1 0.779623 0.968392 0.841657C0.940589 0.896224 0.896224 0.940589 0.841657 0.968392C0.779623 1 0.698415 1 0.536 1H0.464C0.301585 1 0.220377 1 0.158343 0.968392C0.103776 0.940589 0.0594114 0.896224 0.0316081 0.841657C0 0.779623 0 0.698415 0 0.536V0.464Z"
        ></path>
      </mask>

      <!-- Avatar masks -->
      <mask
        id="svg-mask-avatar-status-round"
        maskContentUnits="objectBoundingBox"
        viewBox="0 0 1 1"
      >
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        <circle fill="black" cx="0.84375" cy="0.84375" r="0.25"></circle>
      </mask>

      <mask id="svg-mask-avatar-default" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      </mask>

      <!-- Status masks -->
      <mask id="svg-mask-status-online" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      </mask>

      <mask id="svg-mask-status-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        <circle fill="black" cx="0.25" cy="0.25" r="0.375"></circle>
      </mask>

      <mask id="svg-mask-status-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        <circle fill="black" cx="0.5" cy="0.5" r="0.25"></circle>
      </mask>

      <mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
        <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        <rect
          fill="black"
          x="0.125"
          y="0.375"
          width="0.75"
          height="0.25"
          rx="0.125"
          ry="0.125"
        ></rect>
      </mask>
    </defs>
  </svg>
</template>

<script setup lang="ts"></script>

<style scoped>
.svg-defs-global {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
</style>

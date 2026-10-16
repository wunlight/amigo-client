<template>
  <div class="flex items-center justify-between gap-3 p-3">
    <div class="flex flex-col gap-1.5 overflow-hidden">
      <span class="font-bold truncate">Item Name</span>
      <span class="text-sm text-zinc-500">Rp. 999,999</span>
    </div>
    <div class="flex gap-1.5">
      <Button icon="icon-[tabler--trash]" severity="danger" outlined class="shrink-0 size-7!" />
      <Button icon="icon-[tabler--minus]" severity="secondary" outlined class="shrink-0 size-7!" />
      <div class="grid place-content-center size-7 text-sm bg-zinc-100 dark:bg-zinc-950 rounded-md">
        99
      </div>
      <Button icon="icon-[tabler--plus]" class="shrink-0 size-7!" />
    </div>
  </div>
</template>

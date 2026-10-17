<template>
  <div class="flex items-center justify-between gap-3 p-3">
    <div class="flex flex-col gap-1.5 overflow-hidden">
      <span class="font-medium text-sm truncate">Item Name</span>
      <span class="text-xs text-zinc-500">Rp. 999,999</span>
    </div>
    <div class="flex gap-1.5">
      <Button icon="icon-[tabler--trash]" severity="danger" outlined class="shrink-0 size-6!" />
      <Button icon="icon-[tabler--minus]" severity="secondary" outlined class="shrink-0 size-6!" />
      <div class="grid place-content-center size-6 text-xs bg-zinc-100 dark:bg-zinc-950 rounded-md">
        99
      </div>
      <Button icon="icon-[tabler--plus]" class="shrink-0 size-6!" />
    </div>
  </div>
</template>

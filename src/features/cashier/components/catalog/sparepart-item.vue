<template>
  <div
    class="flex items-start justify-between gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div class="flex flex-col gap-1.5 h-full overflow-hidden">
      <span class="font-bold truncate">Sparepart Name</span>
      <span class="text-sm text-zinc-500">Rp. 999,999</span>
      <span class="mt-auto text-sm text-zinc-500">Stock: 999</span>
    </div>
    <div class="flex flex-col gap-1.5">
      <Button icon="icon-[tabler--plus]" class="shrink-0 size-7!" />
      <div class="grid place-content-center size-7 text-sm bg-zinc-100 dark:bg-zinc-950 rounded-md">
        99
      </div>
      <Button icon="icon-[tabler--minus]" severity="secondary" outlined class="shrink-0 size-7!" />
    </div>
  </div>
</template>

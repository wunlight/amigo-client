<script setup lang="ts">
import { ref } from 'vue'
import type { CheckoutResponse } from '../../types/cart.type'

interface Props {
  receipt: CheckoutResponse
}

const props = defineProps<Props>()

const phoneNumber = ref('')

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const generateWhatsappMessage = () => {
  const receiptText = `
*NOTA TRANSAKSI*

ID Transaksi: ${props.receipt.sale_id}
Tanggal: ${formatDate(props.receipt.created_at)}

*Detail Item:*
${props.receipt.items
  .map(
    (item) =>
      `${item.name}\n` +
      `  Qty: ${item.quantity} x Rp. ${item.unit_price.toLocaleString('en-US')}\n` +
      `  Subtotal: Rp. ${item.subtotal.toLocaleString('en-US')}`,
  )
  .join('\n\n')}

${props.receipt.notes ? `\n*Catatan:*\n${props.receipt.notes}\n` : ''}
*Total: Rp. ${props.receipt.total_amount.toLocaleString('en-US')}*

Terima kasih telah bertransaksi!
  `.trim()

  return receiptText
}

const sendToWhatsapp = () => {
  if (!phoneNumber.value.trim()) {
    alert('Masukkan nomor HP terlebih dahulu')
    return
  }

  const cleanPhoneNumber = phoneNumber.value.replace(/\D/g, '')

  const formattedPhoneNumber = cleanPhoneNumber.startsWith('62')
    ? cleanPhoneNumber
    : cleanPhoneNumber.startsWith('0')
      ? '62' + cleanPhoneNumber.slice(1)
      : '62' + cleanPhoneNumber

  const message = generateWhatsappMessage()
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, '_blank')
}

const copyToClipboard = async () => {
  const message = generateWhatsappMessage()
  try {
    await navigator.clipboard.writeText(message)
    alert('Receipt copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="p-3 w-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
    >
      <div class="space-y-3">
        <div class="text-center border-b border-zinc-300 dark:border-zinc-700 pb-3">
          <h3 class="font-semibold text-lg">TRANSACTION RECEIPT</h3>
          <p class="text-sm text-zinc-500">{{ formatDate(receipt.created_at) }}</p>
        </div>

        <div class="flex justify-between gap-1.5 w-full text-xs">
          <span class="shrink-0 whitespace-nowrap text-zinc-500">ID Transaksi:</span>
          <span class="font-medium truncate">{{ receipt.sale_id }}</span>
        </div>

        <div class="flex flex-col gap-3 border-t border-zinc-300 dark:border-zinc-700 py-3">
          <p class="font-medium">Item Detail:</p>
          <div v-for="item in receipt.items" :key="item.id" class="flex flex-col gap-1">
            <div class="flex justify-between">
              <span>{{ item.name }}</span>
            </div>
            <div class="flex justify-between text-sm text-zinc-500 ml-2">
              <span>{{ item.quantity }} x Rp. {{ item.unit_price.toLocaleString('en-US') }}</span>
              <span>Rp. {{ item.subtotal.toLocaleString('en-US') }}</span>
            </div>
          </div>
        </div>

        <div v-if="receipt.notes" class="bg-blue-50 dark:bg-blue-900/30 p-2 rounded text-xs">
          <p class="font-semibold mb-1">Notes:</p>
          <p class="text-zinc-500 dark:text-zinc-300">{{ receipt.notes }}</p>
        </div>

        <div class="border-t border-zinc-300 dark:border-zinc-700 pt-3">
          <div class="flex justify-between font-semibold">
            <span>Total:</span>
            <span>Rp. {{ receipt.total_amount.toLocaleString('en-US') }}</span>
          </div>
        </div>

        <div class="border-t border-zinc-300 dark:border-zinc-700 pt-3">
          <label class="block text-sm font-medium mb-1.5">Phone No. (for WhatsApp)</label>
          <InputText
            v-model="phoneNumber"
            placeholder="e.g.: 08xxxxxxxxxx atau +62xxxxxxxxxx"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-1.5">
      <Button
        label="Salin ke Clipboard"
        icon="icon-[tabler--copy]"
        severity="secondary"
        @click="copyToClipboard"
      />
      <Button
        label="Kirim ke WhatsApp"
        icon="icon-[tabler--brand-whatsapp]"
        @click="sendToWhatsapp"
      />
    </div>
  </div>
</template>

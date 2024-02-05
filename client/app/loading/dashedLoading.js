export default function DashedLoading({
  border = 'border',
  borderColor = 'border-cyan-500',
}) {
  return (
    <div class="flex flex-row space-x-4">
      <div
        class={`h-12 w-12 animate-spin rounded-full ${border} ${borderColor} border-t-transparent`}
      ></div>
    </div>
  )
}

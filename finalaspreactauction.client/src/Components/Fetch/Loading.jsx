function Loading() {
    return(
        <div class="mx-auto w-full max-w-9/10 rounded-5 border border-blue-300 p-4">
        <div class="flex animate-pulse space-x-4 mx-2">
                <div class="w-45 h-30 rounded-2 bg-gray-200"></div>
            <div class="flex-1 space-y-6 p-3">
                <div class="h-6 m-1 rounded bg-gray-200"></div>
                <div class="space-y-1">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="col-span-1 h-4 m-1 rounded-1 bg-gray-200"></div>
                        <div class="col-span-1 h-4 m-1 rounded-1 bg-gray-200 "></div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="col-span-2 h-5 m-1 rounded-1 bg-gray-200"></div>
                        </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Loading;
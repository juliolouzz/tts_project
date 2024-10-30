<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const router = useRouter();

const { title, content, loading, create } = useGenerationCreate();
const placeholder = `Here I will leave an example:

Look at the promotion folks! Red bull only 7 and 99, don't miss it!
`;

const isDisabled = computed(() => !title.value || !content.value);

const handleCreate = async () => {
  await create();
  router.push('/generations');
};
</script>

<template>
  <div class="w-full h-full flex flex-col items-center gap-10 p-5 pb-32">
    <Onboarding
      title="Shall we create a new audio? 🤩"
      guide="Enter the text you want to record and click generate, the rest is up to us!"
      class="max-w-4xl w-full"
    />

    <div class="max-w-4xl w-full flex flex-col gap-10">
      <div class="flex flex-col gap-2">
        <label for="title">What would you like to call this generation?</label>
        <InputText
          id="title"
          v-model="title"
          type="text"
          placeholder="Father's Day Promotions"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="title">Enter the text you want to record here 👇</label>
        <Textarea
          v-model="content"
          :placeholder="placeholder"
          class="flex-1"
          rows="10"
        />
      </div>

      <div class="flex justify-end items-center gap-2">
        <span class="text-gray-400 text-sm flex items-center gap-1">
          😉 Click here when you're ready
          <i class="pi pi-arrow-right size-4" />
        </span>
        <Button
          :disabled="isDisabled"
          :severity="isDisabled ? 'secondary' : 'primary'"
          :loading="loading"
          label="Generate"
          icon="pi pi-plus"
          @click="handleCreate"
        />
      </div>
    </div>
  </div>
</template>

<template>
  <footer class="mt-16">
    <NuxtSeparator>
      <img src="/signature.png" width="180" class="dark:invert" />
    </NuxtSeparator>

    <div class="flex flex-wrap justify-between items-start gap-2 p-5">
      <div class="space-y-2 text-sm">
        <p>
          Made by
          <NuxtLink
            to="https://adedero.vercel.app"
            target="_blank"
            class="font-semibold text-primary hover:underline"
          >
            Adedero
          </NuxtLink>
        </p>

        <div class="flex items-center gap-2">
          <NuxtButton
            to="https://adedero.vercel.app"
            target="_blank"
            size="sm"
            icon="lucide:globe"
            color="neutral"
            variant="subtle"
          />
          <NuxtButton
            to="https://github.com/Adedero"
            target="_blank"
            size="sm"
            icon="lucide:github"
            color="neutral"
            variant="subtle"
          />

          <NuxtButton
            to="https://x.com/Ade_Dero"
            target="_blank"
            size="sm"
            color="neutral"
            variant="subtle"
          >
            <template #leading>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                class="bi bi-twitter-x"
                viewBox="0 0 16 16"
                height="15"
                width="15"
              >
                <desc>Twitter X Streamline Icon: https://streamlinehq.com</desc>
                <path
                  fill="currentColor"
                  d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                  stroke-width="1"
                />
              </svg>
            </template>
          </NuxtButton>
        </div>
      </div>

      <p class="text-sm">
        Made with
        <NuxtLink
          to="https://nuxt.com/"
          target="_blank"
          class="font-semibold text-green-500 text-sm hover:underline"
        >
          NuxtJS
        </NuxtLink>
      </p>
    </div>
  </footer>
</template>

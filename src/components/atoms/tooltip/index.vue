<template>
    <div ref="customTooltip" v-show="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
        class="fixed bg-gray-700 border text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity z-1000">
        {{ tooltip.text }}
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, onMounted, ref, nextTick } from 'vue';

const customTooltip = ref<HTMLDivElement>();

const tooltip = ref({
      visible: false,
      text: "",
      x: 0,
      y: 0,
      originalTitle: "",
      targetEl: null as HTMLElement | null,
    });

    const showTooltip = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      tooltip.value.originalTitle = target.getAttribute("title") || "";
      
      if (tooltip.value.originalTitle) {
        tooltip.value.text = tooltip.value.originalTitle;
        tooltip.value.visible = true;
        tooltip.value.targetEl = target;

        // Supprime l'attribut `title` pour désactiver l'info-bulle du navigateur
        target.removeAttribute("title");

        await nextTick(); // Attendre que le DOM mette à jour l'affichage du tooltip
        adjustTooltipPosition(event);
      }
    };

    const moveTooltip = (event: MouseEvent) => {
      if (tooltip.value.visible) {
        adjustTooltipPosition(event);
      }
    };

    const hideTooltip = () => {
      tooltip.value.visible = false;
      // Restaurer le `title`
      if (tooltip.value.targetEl) {
        tooltip.value.targetEl.setAttribute("title", tooltip.value.originalTitle);
        tooltip.value.targetEl = null;
      }
    };

    const adjustTooltipPosition = (event: MouseEvent) => {
      const tooltipEl = customTooltip.value;
      if (!tooltipEl) return;

      const tooltipWidth = tooltipEl.offsetWidth;
      const tooltipHeight = tooltipEl.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let x = event.clientX + 10;
      let y = event.clientY + 20;

      // Si le tooltip dépasse le bord droit
      if (x + tooltipWidth > screenWidth) {
        x = event.clientX - tooltipWidth - 10;
      }

      // Si le tooltip dépasse le bord inférieur
      if (y + tooltipHeight > screenHeight) {
        y = event.clientY - tooltipHeight + 0;
      }

      tooltip.value.x = x;
      tooltip.value.y = y;
    };

    const attachTooltipEvents = () => {
      const elements = document.querySelectorAll<HTMLElement>("[title]");
      elements.forEach((el) => {
        el.addEventListener("mouseenter", showTooltip);
        el.addEventListener("mousemove", moveTooltip);
        el.addEventListener("mouseleave", hideTooltip);
      });
    };

    const detachTooltipEvents = () => {
      const elements = document.querySelectorAll<HTMLElement>("[title]");
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", showTooltip);
        el.removeEventListener("mousemove", moveTooltip);
        el.removeEventListener("mouseleave", hideTooltip);
      });
    };

    onMounted(attachTooltipEvents);
    onUnmounted(detachTooltipEvents);

</script>
<template>
  <div class="main">
    <div class="left" ref="leftContainer">
      <template v-for="attackCategory in attackCategories" :key="attackCategory.id">
        <div class="attack_category">
          <p class="category">{{ attackCategory.name }}</p>
          <div class="attack_list">
            <template v-for="attack in attackCategory.attacks" :key="attack.id">
              <div class="attacks">
                <div
                  class="attack"
                  :id="attack.id"
                  @click="attackClick(attackCategory.id, attack.id)"
                  :class="{ clicked: activeAttacks[attackCategory.id] === attack.id }"
                >
                  <p>{{ attack.name }}</p>
                </div>
                <div class="sub_attacks" v-show="activeAttacks[attackCategory.id] === attack.id">
                  <template v-for="subAttack in attack.techniques" :key="subAttack.id">
                    <div class="sub_attack">
                      <p>{{ subAttack.name }}</p>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <svg
        id="arrow-overlay"
        :style="arrowOverlayStyle"
        style="position: absolute; top: 0; left: 0; pointer-events: none; z-index: 9999;"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polyline points="0,0 10,3.5 0,7" fill="none" stroke="red" stroke-width="1" />
          </marker>
        </defs>
      </svg>
    </div>
    <div class="right">
      <template v-for="defendCategory in defendCategories" :key="defendCategory.id">
        <div class="defend_category">
          <a :href="defendCategory.url" target="_blank">{{ defendCategory.name }}</a>
          <div class="defend_sub_categories">
            <template v-for="defendSubCategory in defendCategory.subCategories" :key="defendSubCategory.id">
              <div class="defends">
                <a
                  class="defend_sub_category" 
                  :class="{ related: hasRelatedDefends(defendSubCategory) }"
                  :href="defendSubCategory.url"
                  target="_blank"
                >
                  <p>{{ defendSubCategory.name }}</p>
                </a>
                <div class="defend_list" v-show="hasRelatedDefends(defendSubCategory)">
                  <template v-for="defend in defendSubCategory.defends" :key="defend.id">
                    <a
                      class="defend"
                      :class="{ related: isDefendRelated(defend) }"
                      :href="defend.url"
                      target="_blank"
                    >
                      <p>{{ defend.name }}</p>
                    </a>
                    <template v-for="subDefend in defend.subDefends" :key="subDefend.id">
                      <a
                        class="sub_defend"
                        :class="{ related: isSubDefendRelated(subDefend) }"
                        :href="subDefend.url"
                        target="_blank"
                      >
                        <p>{{ subDefend.name }}</p>
                      </a>
                      <template v-for="child in subDefend.children" :key="child.id">
                        <a
                          class="child_defend"
                          :class="{ related: isChildRelated(child) }"
                          :href="child.url"
                          target="_blank"
                        >
                          <p>{{ child.name }}</p>
                        </a>
                      </template>
                    </template>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script lang="ts" setup>
const attackCategories = await getAttacks();
const defendCategories = await getDefends();

const activeAttacks = ref<Record<string, string | null>>({});

const activeAttackIds = computed(() =>
  Object.values(activeAttacks.value).filter((id): id is string => id !== null)
);

const attackClick = (categoryId: string, attackId: string) => {
  if (activeAttacks.value[categoryId] === attackId) {
    activeAttacks.value[categoryId] = null;
  } else {
    activeAttacks.value[categoryId] = attackId;
  }
};

const isDefendRelated = (defend: any): boolean => {
  const defendRelated =
    defend.relatedAttackIds &&
    defend.relatedAttackIds.some((id: string) => activeAttackIds.value.includes(id));
  const subDefendRelated =
    defend.subDefends &&
    defend.subDefends.some((subDefend: any) => isSubDefendRelated(subDefend));
  return defendRelated || subDefendRelated;
};

const isSubDefendRelated = (subDefend: any): boolean => {
  const subDefendRelated =
    subDefend.relatedAttackIds &&
    subDefend.relatedAttackIds.some((id: string) => activeAttackIds.value.includes(id));
  const childRelated =
    subDefend.children &&
    subDefend.children.some((child: any) => isChildRelated(child));
  return subDefendRelated || childRelated;
};

const isChildRelated = (child: any): boolean => {
  return (
    child.relatedAttackIds &&
    child.relatedAttackIds.some((id: string) => activeAttackIds.value.includes(id))
  );
};

const hasRelatedDefends = (defendSubCategory: any): boolean => {
  return defendSubCategory.defends.some((defend: any) => isDefendRelated(defend));
};

let arrowLines: SVGLineElement[] = [];
const leftContainer = ref<HTMLElement | null>(null);
const arrowOverlayStyle = ref({});

onMounted(() => {
  leftContainer.value = document.querySelector('.left');
  if (leftContainer.value) {
    updateArrowOverlaySize();
    window.addEventListener('resize', updateArrowOverlaySize);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateArrowOverlaySize);
});

function updateArrowOverlaySize() {
  if (leftContainer.value) {
    arrowOverlayStyle.value = {
      width: leftContainer.value.scrollWidth + 'px',
      height: leftContainer.value.scrollHeight + 'px',
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      zIndex: '9999'
    };
  }
}

function clearArrows() {
  const svg = document.getElementById("arrow-overlay");
  if (svg) {
    arrowLines.forEach((line) => svg.removeChild(line));
    arrowLines = [];
  }
}

function drawArrow(fromEl: HTMLElement, toEl: HTMLElement) {
  const svg = document.getElementById("arrow-overlay");
  if (!svg || !leftContainer.value) return;

  const scrollLeft = leftContainer.value.scrollLeft;
  const scrollTop = leftContainer.value.scrollTop;

  const containerRect = leftContainer.value.getBoundingClientRect();
  
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  
  const startX = fromRect.right - containerRect.left + scrollLeft;
  const startY = fromRect.top + fromRect.height / 2 - containerRect.top + scrollTop;
  const endX = toRect.left - containerRect.left + scrollLeft;
  const endY = toRect.top + toRect.height / 2 - containerRect.top + scrollTop;

  const svgns = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(svgns, "line");
  line.setAttribute("x1", startX.toString());
  line.setAttribute("y1", startY.toString());
  line.setAttribute("x2", endX.toString());
  line.setAttribute("y2", endY.toString());
  line.setAttribute("stroke", "red");
  line.setAttribute("stroke-width", "1");
  line.setAttribute("marker-end", "url(#arrowhead)");
  
  svg.appendChild(line);
  arrowLines.push(line);
}

watch(activeAttackIds, async () => {
  clearArrows();
  await nextTick();

  const activeElements: HTMLElement[] = [];
  activeAttackIds.value.forEach((attackId) => {
    const el = document.getElementById(attackId);
    if (el) activeElements.push(el);
  });
  
  activeElements.sort((a, b) => {
    return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
  });

  for (let i = 0; i < activeElements.length - 1; i++) {
    drawArrow(activeElements[i], activeElements[i + 1]);
  }
});
</script>

<style lang="scss" scoped>
p {
  word-break: break-all;
}
.main {
  position: relative;
  height: 100vh;
  .left {
    position: absolute;
    left: 0;
    width: 800px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    padding: 0 4px;

    * {
      flex: 0 0 auto;
    }

    .attack_category {
      display: flex;
      flex-direction: column;
      width: 100px;
      gap: 8px;

      .category {
        display: block;
        height: 48px;
      }
      
      .attack_list {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .attacks {
          display: flex;
          flex-direction: column;
          gap: 4px;

          div {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .attack {
            padding: 2px;
            border: 2px solid #000;
            font-size: 14px;
            cursor: pointer;
            user-select: none;

            &.clicked {
              border-color: red;
            }
          }

          .sub_attacks {
            .sub_attack {
              padding: 2px;
              border: 1px solid #9f9f9f;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    width: 800px;
    height: 100%;
    overflow-x: auto;
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    padding: 0 4px;

    * {
      flex: 0 0 auto;
    }

    .defend_category {
      display: flex;
      flex-direction: column;
      width: 100px;
      gap: 8px;

      .defend_sub_categories {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .defends {
          display: flex;
          flex-direction: column;
          gap: 4px;

          div {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .defend_sub_category {
            padding: 2px;
            border: 2px solid #000;
            font-size: 14px;

            &.related {
              border-color: blue;
            }
          }

          .defend_list {
            display: none;

            &:has(.related) {
              display: flex;
            }

            .defend {
              padding: 2px;
              border: 1px solid #000;
              font-size: 14px;

              &.related {
                border-color: blue;
              }
            }

            .sub_defend {
              padding: 2px;
              border: 1px solid #9f9f9f;
              font-size: 12px;

              &.related {
                border-color: blue;
              }
            }

            .child_defend {
              padding: 2px;
              border: 1px solid #dcdcdc;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
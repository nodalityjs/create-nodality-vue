<script setup>
import { useTemplateRef, onMounted, defineProps, defineEmits, watch } from 'vue'

// Define props to accept the msg value
const props = defineProps({
  msg: String,
  text: Object
}) 

const emit = defineEmits(['update:msg'])

// the first argument must match the ref value in the template
const input = useTemplateRef('my-input')
let mycomp = useTemplateRef('my-comp')

onMounted(() => {
  input.value.focus()
 let ela = props.text.render();//document.createElement("h1");
 mycomp.value.appendChild(ela);
})

watch(() => props.msg, () => { // 12:21:57 Wow!!!

 mycomp.value.innerHTML = ""; // Clear existing content
    const element = props.text.render(); // Call the render method
    mycomp.value.appendChild(element);
})

function updateMessage(event) {
  emit('update:msg', event.target.value)
}
</script>

<template>
<input ref="my-input" :value="msg" @input="updateMessage" />
<div ref="my-comp"/>
</template>
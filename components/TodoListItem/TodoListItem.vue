<template>
    <li>
        <div>{{ todo.title}}</div>
        <div>{{ todo.userName }}</div>
    </li>
</template>
<script>
module.exports = {
    props : ["todo"]
};
</script>
<template>
    <div class="todo-list">
        <ul>
            <todo-list-item v-for="todo in todos" :todo="todo" :key="todo.id"></todo-list-item>
        </ul>
    </div>
</template>
<script src="./TodoList.js"></script>
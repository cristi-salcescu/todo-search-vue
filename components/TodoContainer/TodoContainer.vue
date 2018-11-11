<template>
      <div>
        <todo-search @search="search"></todo-search>
        <todo-list :todos="todos"></todo-list>
      </div>
</template>
<script src="./TodoContainer.js"></script>
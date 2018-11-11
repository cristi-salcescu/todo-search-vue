<template>
      <form class="search-form">
        <input v-model="text" placeholder="Search ..." class="input input-large" @keydown.enter.prevent="search" />
        <button @click="search" class="btn" type="button">Search</button>
      </form>
</template>
<script src="./TodoSearch.js"></script>
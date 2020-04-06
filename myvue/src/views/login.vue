<template>
	<div id="app">
		<h2>登陆界面</h2>
		<el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
		<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
		  <el-button type="success">登陆</el-button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				username:'',
				password:''
			}
		}
	}
</script>

<style>
	#app{
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 20rem;
	}
</style>

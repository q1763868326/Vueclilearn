<template>
	<div id="app_login">
		<h2>{{title}}</h2>
		<el-input v-model="username" placeholder="请输入用户名" clearable @blur="validate_username"></el-input>
		<el-input placeholder="请输入密码" v-model="password" show-password @keyup.enter.native="login"></el-input>
		<el-input placeholder="请重复确认密码" v-model="passwordagain" show-password v-if="!islogin" @blur="validate_password" @keyup.enter.native="reject"></el-input>
		<div v-if="onerror" style="color:red">{{tips}}</div>
		<div >
			<el-button type="success" style="width: 100%;" v-if="islogin" @click="login">登陆</el-button>
		</div>		
		<div>		
			<el-button type="primary" style="width: 100%;" v-if="!succreject" @click="reject">注册</el-button>
			<div v-if="succreject" style="color: green;">注册成功！</div>		
		</div>
		<div>
			<a href="./" v-if="!islogin">返回登陆</a>
		</div>
		
	</div>
</template>

<script>
	import axios from "axios"
	export default{
		data(){
			return {
				username:'',
				password:'',
				passwordagain:'',
				islogin:true,
				title:"登陆界面",
				succreject:false,
				onerror:false,
				tips:""
			}
		},
		methods:{
			reject(){
				if(this.islogin==true){
					this.onerror=false
					this.islogin=false
					this.title="注册界面"
				}else if(!this.onerror){
					var password=this.$md5(this.password)
					if(this.password.trim().length==0){
						this.tips="密码不能为空"
						this.onerror=true
						return
					}
					axios.post("http://116.62.47.156/createuser/",{"username":this.username,"password":password}).then(response=>{
						if(response.data=="ok"){
							this.onerror=false
							this.succreject=true
						}
						else{
							this.onerror=true
							this.tips="用户名已存在！"
						}
					}).catch(error=>{
						console.log(error)
					})
				}else{
					
				}	
			},
			validate_password(){
				if(this.password===this.passwordagain){					
					this.onerror=false
				}else{
					this.tips="密码不一致,请重新输入"
					this.onerror=true
				}
			},
			validate_username(){
				if(this.username.trim().length==0){
					this.tips="用户名不能为空"
					this.onerror=true
				}
				else{
					this.onerror=false
				}
			},
			login(){
				if(this.islogin){
					var password=this.$md5(this.password)
					axios.post("http://116.62.47.156/login/",{"username":this.username,"password":password}).then(response=>{
						if(response.data=="ok"){
							this.$cookies.set("username",this.username)
							this.$cookies.set("password",password)
							window.sessionStorage.setItem("owner",this.username)
							this.$router.push({path:"/home"});
						}else{
							this.tips="用户名或密码错误！"
							this.onerror=true
						}
					}).catch(error=>{
						this.tips="服务器挂了！"
						this.onerror=true
						console.log(error)
					})
				}
				
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	#app_login{
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 60vh
	}
</style>

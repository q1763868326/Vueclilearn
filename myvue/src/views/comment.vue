<template>
	<div id="app_comment">
		<h2 id="title">留言</h2>
		<el-input
		  type="textarea"
		  :rows="3"
		  placeholder="请输入内容"
		  v-model="textarea">
		</el-input>
		<el-button type="primary" @click="commit">提交</el-button>
		<router-link to="/home" style="color: #606266;">返回</router-link>
	</div>	
</template>

<script>
	import axios from "axios"
	export default{
		data(){
			return{
				textarea:""
			}
		},
		created() {
			let username = this.$cookies.get("username")	
			let password = this.$cookies.get("password")
			axios.post("http://116.62.47.156/login/",{"username":username,"password":password}).then(response=>{
				if(response.data=="ok"){
					this.username = username
				}
				else{
					this.$router.push({path:"/"});
				}
		}).catch(error=>{
					console.log(error)
				})
		},
		methods:{
			commit(){
				var date = new Date()
				var year = date.getFullYear(),
					month = date.getMonth() + 1,//月份是从0开始的
					day = date.getDate(),
					hour = date.getHours(),
					min = date.getMinutes(),
					sec = date.getSeconds();
				var newTime = year + '-' +
								month + '-' +
								day + ' ' +
								hour + ':' +
								min + ':' +
								sec;
				var owner = window.sessionStorage.getItem("owner")
				axios.post("http://116.62.47.156/commit/",{"username":this.username,"content":this.textarea,"commitdate":newTime,"owner":owner}).then(response=>{
						if(response.data=="ok"){
							this.$router.push({"path":"/home"})
						}
				}).catch(error=>{
							console.log(error)
						})
			}
		}
	}
</script>

<style scoped>
	#title{
		font-size: 2rem;
	}
	#app_comment{
		margin-top: 14vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 40vh;
	}
</style>

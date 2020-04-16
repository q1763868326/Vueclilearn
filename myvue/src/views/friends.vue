<template>
	<div>
		<el-card class="box-card">
		  <div slot="header" class="clearfix" style="text-align: center; font-size: 1.8rem;display: flex;justify-content: space-between;align-items: center;">
		    <span>好友列表-{{currentuser}}</span>
			<div @click="changemailstate">
				<el-switch
				  v-model="openmail"
				  active-color="#13ce66"
				  inactive-color="#ff4949"				  
				  >
				</el-switch>
			</div>		
			<i class="fa fa-plus-circle" aria-hidden="true" style="font-size: 2.1rem;" @click="tosearch"></i>
		  </div>
		  <div v-for="(item,index) in result_search" :key="index" class="searchitem">
		    <div style="align-self: center;" @click="tohome(item['username'])">{{item["username"]}}</div>
			<el-button :type="gettype(item['type'])" :id="bindid(index)" @click="guanzhuorquguan(item['username'],index)" style="height: 2rem;">{{getstr(item["type"])}}</el-button>
		  </div>
		</el-card>
	</div>
</template>

<script>
	import {validateuser} from "../utils/validateuser.js"
	import axios from "axios"
	export default{
		data(){
			return{
				openmail:false,
				currentuser:"",
				content_search:"",
				result_search:[],
				mailstate:""
			}
		},
		methods:{
			open() {
					
			        this.$prompt('请输入邮箱', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
			          inputErrorMessage: '邮箱格式不正确',
					  center:true
			        }).then(({ value }) => {
						let username = this.$cookies.get("username")
						var set = {
							url:"http://116.62.47.156/openmail/",
							method:"post",
							data:{"username":username,"type":"open","mail":value}
						}
						axios.request(set).then(response=>{
							console.log(response.data)
							this.getmailstate()
						}).catch(error=>{
							console.log(error)
							this.getmailstate()
						})
			        }).catch(() => {
						this.getmailstate()
			        });
					},
			getmailstate(){
				
				let username = this.$cookies.get("username")
				var set = {
						url:"http://116.62.47.156/openmail/",
						method:"post",
						data:{"username":username,"type":"get"}
					}
					axios.request(set).then(response=>{
						console.log(response.data)
						this.mailstate=response.data
						console.log(this.mailstate)
						
						if(this.mailstate=="existandopen"){
							this.openmail=true
							console.log("opening")
						}else{
							this.openmail=false
							console.log("closing")
						}
					}).catch(error=>{
						console.log(error)
					})
			},
			changemailstate(){
				let username = this.$cookies.get("username")
				if(this.mailstate=="existandopen"){
					
					var set = {
						url:"http://116.62.47.156/openmail/",
						method:"post",
						data:{"username":username,"type":"close"}
					}
					axios.request(set).then(response=>{
						console.log(response.data)
						this.getmailstate()
					}).catch(error=>{
						console.log(error)
						this.getmailstate()
					})
				}
				else if(this.mailstate=="existandclose"){
						
					var set = {
						url:"http://116.62.47.156/openmail/",
						method:"post",
						data:{"username":username,"type":"open"}
					}
					axios.request(set).then(response=>{
						console.log(response.data)
						this.getmailstate()
					}).catch(error=>{
						console.log(error)
						this.getmailstate()
					})
				}
				else{
					
					this.open()
				}
			},
			tohome(username){
				window.sessionStorage.setItem("owner",username)
				this.$router.push("/home")
			},
			tosearch(){
				this.$router.push("/mine")
			},
			gettype(friend){
				if (friend=="friend"){
					return ""
				}
				else{
					return "primary"
				}
			},
			getstr(friend){
				if (friend=="friend"){
					return "已关注"
				}
				else{
					return "关注"
				}
			},
			bindid(id){
				return "button"+id
			},
			changetype(id){
				var button = document.getElementById("button"+id)
				if(button.innerText!="已关注"){
					button.setAttribute("class","el-button")
					button.innerHTML="已关注"
				}
				else{
					button.setAttribute("class"," el-button el-button--primary")
					button.innerText="关注"
				}			
			},
			searchuser(){
				let owner = this.$cookies.get("username")
				var set = {
					url:"http://116.62.47.156/getfriends/",
					method:"post",
					data:{"owner":owner}
				}
				axios.request(set).then(response=>{
				this.result_search = response.data["data"]
				}).catch(error=>{
					console.log(error)
				})
			},
			// 关注取关
			guanzhuorquguan(username,id){
				let owner = this.$cookies.get("username")
				var button_html = document.getElementById("button"+id).innerText
				if(button_html=="关注"){
					var set = {
						url:"http://116.62.47.156/guanzhu/",
						method:"post",
						data:{"owner":owner,"type":"friend","username":username}
					}
					}
				else{
					var set = {
						url:"http://116.62.47.156/guanzhu/",
						method:"post",
						data:{"owner":owner,"type":"no friend","username":username}
					}
				}
				axios.request(set).then(response=>{
					if(response.data=="ok"){
						this.changetype(id)
					}	
				}).catch(error=>{
					console.log(error)
				})
				
			}
		},
		created() {
			this.currentuser=this.$cookies.get("username")
			validateuser()
			this.searchuser()
			this.getmailstate()
			
		},
		mounted() {
		
		}
	}
</script>

<style>
</style>

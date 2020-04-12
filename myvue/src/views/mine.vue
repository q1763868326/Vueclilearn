<template>
	<div>
		<div class="title"><i class="fa fa-chevron-circle-left" aria-hidden="true" @click="tofriends"></i><span style="margin-left: 5.5rem;">{{title}}</span></div>
		<div class="search">
			<el-input placeholder="请输入内容" v-model="content_search" @keyup.enter.native="searchuser" clearable>
			    <i slot="prefix" class="el-input__icon el-icon-search"></i>
			  </el-input>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 0.3rem;" @click="searchuser">搜索</el-button>
		</div>
		<el-card class="box-card" style="margin-top: 1rem;">
		  <div slot="header" class="clearfix" style="text-align: start;">
		    <span>搜索结果：</span>
		  </div>
		  <div v-for="(item,index) in result_search" :key="index" class="searchitem">
		    <div style="align-self: center;">{{item["username"]}}</div>
			<el-button :type="gettype(item['friend'])" :id="bindid(index)" @click="guanzhuorquguan(item['username'],index)" style="height: 2rem;">{{getstr(item["friend"])}}</el-button>
		  </div>
		</el-card>
	</div>
</template>

<script>
	import CircleMenu from 'vue-circle-menu'
	import axios from "axios"
	import {validateuser} from "../utils/validateuser.js"
	export default{
		data(){
			return{
				title:"好友搜索",
				content_search:"",
				result_search:[]
			}
		},
		methods:{
			tofriends(){
				this.$router.push("/friends")
			},
			gettype(friend){
				if (friend){
					return ""
				}
				else{
					return "primary"
				}
			},
			getstr(friend){
				if (friend){
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
					url:"http://116.62.47.156/searchuser/",
					method:"post",
					data:{"content_search":this.content_search,"owner":owner}
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
			validateuser()
		}
	}
</script>

<style>
	.searchitem{
		display: flex;
		justify-content: space-between;
		margin-bottom:0.5rem;
		font-size: 1.2rem;
	}
	.title{
		font-size: 2rem;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
	}
	.search{
		display: flex;
		justify-content: space-between;
	}
</style>

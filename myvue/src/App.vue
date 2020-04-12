<template>
  <div id="app">
	  <router-view v-if="isreflash"></router-view>
	<div class="tab" v-if="islogin()">
		
			<el-button type="primary" style="flex: 1;margin: 0;" @click="toworld"><i class="fa fa-globe" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
			<el-button type="primary" style="flex: 1;margin: 0;" @click="tohome"><i class="fa fa-home" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
			<el-button type="primary" style="flex: 1;margin: 0;" @click="tofriends"><i class="fa fa-address-book" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
	</div>
  </div>
 
</template>
<script>
	import axios from "axios"
	export default{
		data(){
			return{
				isreflash:true,
			}
		},
		methods:{
			islogin(){
				if(this.$router.history.current.name=="login"){
					return false
				}
				else{
					return true
				}
			},
			tofriends(){
				if(this.$router.history.current.name=="friends"){
					console.log(this.$router.history.current.name)
					this.isreflash=false
					this.$nextTick(function(){
						this.isreflash=true
					})
				}
				else{
					this.$router.push("/friends")
				}
			},
			tohome(){
				window.sessionStorage.setItem("owner",this.$cookies.get("username"))
				if(this.$router.history.current.name=="home"){
					this.isreflash=false
					this.$nextTick(function(){
						this.isreflash=true
					})
				}
				else{
					this.$router.push("/home")
				}
			},
			toworld(){
				
				var set = {
					url:"http://116.62.47.156/randomdata/",
					method:"post",
					data:{"currentuser":this.$cookies.get("username")}
				}
				axios.request(set).then(response=>{
				window.sessionStorage.setItem("owner",response.data["randomuser"])
				if(this.$router.history.current.name=="home"){
					this.isreflash=false
					this.$nextTick(function(){
						this.isreflash=true
					})
				}
				else{
					this.$router.push("/home")
				}
				}).catch(error=>{
					console.log(error)
				})
				
				
			}
		}
	}
</script>

<style>
.tab{
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;		
	}	
#app {
	text-align: center;
	overflow: hidden;
}
</style>

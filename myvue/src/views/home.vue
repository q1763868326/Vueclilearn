<template>
	<div id="app_content">
		<div style="font-size: 2rem;color: #409EFF;">{{username}},欢迎你!</div>
		<div id="box"  v-infinite-scroll="load" infinite-scroll-distance="2" infinite-scroll-disabled="busy">
				<div class="card infinite-list-item" v-for="(item,index) in data" :key="index" :class="index">
					<div style="align-self: flex-start; font-size: 0.9rem; font-weight: 700;">{{item["username"]}}:</div>
					<div style="align-self: flex-start; font-weight: 700;">{{item["content"]}}</div>
					<div style="align-self: flex-end; font-weight: 700; font-size: 0.8rem;">{{item["commitdate"]}}</div>
				</div>
				<i class="el-icon-loading" style="font-size: 2rem;" v-show="busy"></i>
				<!-- <i v-show="over">没有更多了</i> -->
		</div>
			
			<div class="btn_comment">
				<circle-menu type="top" :number='2' :colors="[ '#409EFF', '#F56C6C', '#67C23A', '#F3825F', '#F19584']" mask='white' btn circle >					
				    <router-link to="/comment" slot="item_2"><i class="el-icon-s-promotion"></i></router-link>
					<div @click="exit" slot="item_1"><router-link to="/" ><i class="el-icon-switch-button"></i></router-link></div>
				</circle-menu>
			</div>	
	</div>
</template>

<script>
	import CircleMenu from 'vue-circle-menu'
	import axios from "axios"
	export default{
		data(){
			return {
				username:"",
				count:0,
				busy:false,
				data:[],
				over:false
			}
		},
		components: {
		  CircleMenu
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
		mounted() {
			this.requestdata()
		},
		methods:{
			exit(){
				this.$cookies.remove("username")
				this.$cookies.remove("password")
			},
			load(){
				setTimeout(() => {
						this.busy = true;
				        this.count+=1
				        this.busy = false;
				      }, 1000);
				
			},
			requestdata(){
				let username = this.$cookies.get("username")
				let password = this.$cookies.get("password")
				axios.post("http://116.62.47.156/pullcomment/",{"username":username,"password":password}).then(response=>{
						this.data=response.data["comment"].reverse()
				}).catch(error=>{
							console.log(error)
						})
			}
			
		}
	}
</script>

<style scoped>
	.btn_comment{
		position: fixed;
		bottom: 0;
		right: 0;
		margin-bottom: 3rem;
		margin-right: 1rem;
	}
	.card{
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		justify-content: space-between;
	}
	.card:nth-child(4n+1){
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		background-color: #67C23A;
	}
	.card:nth-child(4n+2){
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		background-color: #E6A23C;
	}
	.card:nth-child(4n+3){
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		background-color: #F56C6C;
	}
	.card:nth-child(4n+4){
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		background-color: #909399;
	}
	/* .card:nth-child(odd){
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		height: 5rem;
		margin: 1rem;
		
	} */
	
	#box{
		position: absolute;
		height: 98%;
		width: 99%;
		overflow-y: auto;
	}
	#app_content{
		overflow-y: auto;
	}
	
</style>

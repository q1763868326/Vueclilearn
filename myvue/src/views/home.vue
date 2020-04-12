<template>
	<div id="app_content">
		<div style="font-size: 2rem;color: #409EFF;">{{title}}</div>
		<div v-if="isempty">{{tips}}</div>
		<div id="box"  v-infinite-scroll="load" infinite-scroll-distance="2" infinite-scroll-disabled="busy">
				<div class="card infinite-list-item" v-for="(item,index) in data" :key="index" :class="index">
					<div style="align-self: flex-start; font-size: 0.9rem; font-weight: 700;">{{item["username"]}}:</div>
					<div style="align-self: flex-start; font-weight: 700;">{{item["content"]}}</div>
					<div style="align-self: flex-end; font-weight: 700; font-size: 0.8rem;">{{item["commitdate"]}}</div>
				</div>
				<i class="el-icon-loading" style="font-size: 2rem;" v-show="busy"></i>
				<!-- <i v-show="over">没有更多了</i> -->
		</div>
		<!-- <div class="tab">
			
				<el-button type="primary" style="flex: 1;margin: 0;"><i class="fa fa-globe" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
				<el-button type="primary" style="flex: 1;margin: 0;"><i class="fa fa-home" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
				<el-button type="primary" style="flex: 1;margin: 0;"><i class="fa fa-address-book" aria-hidden="true" style="font-size: 1.4rem;"></i></el-button>
		</div> -->
				
			<div class="btn_comment">
				<circle-menu type="top" :number='2' :colors="[ '#409EFF', '#F56C6C', '#67C23A', '#F3825F', '#F19584']" mask='white' btn circle >					
				    <router-link to="/comment" slot="item_2"><i class="el-icon-s-promotion" style="font-size: 1.3rem;"></i></router-link>
					<div @click="exit" slot="item_1"><router-link to="/" ><i class="el-icon-switch-button" style="font-size: 1.1rem;"></i></router-link></div>
				</circle-menu>
			</div>	
	</div>
</template>

<script>
	import CircleMenu from 'vue-circle-menu'
	import axios from "axios"
	import {validateuser} from "../utils/validateuser.js"
	export default{
		data(){
			return {
				title:"",
				username:"",
				count:0,
				busy:false,
				data:[],
				over:false,
				tips:"还没有留言，留个言再走吧！",
				isempty:false
			}
		},
		components: {
		  CircleMenu
		},
		created() {
			validateuser()
		},
		mounted() {
			this.requestdata()
		},
		methods:{
			exit(){
				this.$cookies.remove("username")
				this.$cookies.remove("password")
				window.sessionStorage.clear()
			},
			load(){
				// setTimeout(() => {
				// 		this.busy = true;
				//         this.count+=1
				//         this.busy = false;
				//       }, 1000);
				
			},
			requestdata(){
				let username = this.$cookies.get("username")
				if(!window.sessionStorage.getItem("owner")){
					window.sessionStorage.setItem("owner",username)
					this.title="我的留言板"
					}
				else if(window.sessionStorage.getItem("owner")==username){
					this.title="我的留言板"
				}
				else{
					this.title=window.sessionStorage.getItem("owner")+"的留言板"
				}
				var owner = window.sessionStorage.getItem("owner")
				let password = this.$cookies.get("password")
				axios.post("http://116.62.47.156/pullcomment/",{"owner":owner}).then(response=>{
					if(response.data["comment"]){
						this.data=response.data["comment"].reverse()
					}
						else{
							this.isempty=true
						}
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
		width: 95%;
		overflow-y: auto;
	}
	
</style>

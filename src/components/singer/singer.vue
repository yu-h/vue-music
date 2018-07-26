<template>
    <div class="singer">
        <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getSingerList} from "api/singer"
	import {ERR_OK} from "api/config"
    import Singer from "common/js/singer"
    import ListView from 'base/listview/listview'
    // import {mapMutations} from 'vuex'

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    export default {
		name: "singer",
        data(){
		    return{
                singers:[],
                singer:''
            }
        },
        created(){
		    this._getSingerList();

		},
        mounted(){
			var singer = this.singer;
			this.$store.commit('SET_SINGER',singer)
		},
        methods:{
            // handlePlaylist(playlist){
				// const buttom = playlist.length > 0 ? '60px' : ''
            //     this.$refs.Json.style.bottom = bottom
            //     this.$refs.list.refresh()
            // },
			selectSinger(singer){
				this.$router.push({
                    path:`/singer/${singer.id}`
                })
                this.singer = singer;
            },
		    _getSingerList(){
                getSingerList().then((res)=>{
                	console.log(res)
                    if (res.code === ERR_OK){
                        // this.singers = this._normalizeSinger(res.data.list);
                        console.log(res.data)
                    }
                })
            },
            _normalizeSinger(list){
		        let map = {
		            hot:{
		                title:HOT_NAME,
                        items:[]
                    }
                };
		        list.forEach((item,index) => {
		            if (index < HOT_SINGER_LEN){
		                map.hot.items.push(new Singer({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name,
                        }))
                    }
                    const key = item.Findex;
		            if (!map[key]){
		                map[key] = {
		                    title:key,
                            items:[]
                        }
                    }
                    map[key].items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                });
                //为了得到有序列表，我们需要处理map
                let hot = [];
		        let ret = [];
		        for (let key in map){
		            let val = map[key];
		            if (val.title.match(/[a-zA-Z]/)){
		                ret.push(val)
                    } else if (val.title === HOT_NAME){
		                hot.push(val)
                    }
                }
                ret.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            }
        },
        components:{
		    ListView
        }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
    psoition:fixd
    top:88px
    bottom:0
    width: 100%
</style>
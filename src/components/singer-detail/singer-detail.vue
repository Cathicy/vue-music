<template>
  <transition name="slide">
    <music-list :songs="songs"
                :bg-image="bgImage"
                :title="title"
    >
    </music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
import {getMusic} from 'api/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      if (!list) {
        return
      }
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res)
              const svkey = res.data.items
              // console.log(svkey[0])
              const songVkey = svkey[0].vkey
              // console.log(songVkey)
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .silde-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transition: translate3d(100%, 0, 0)
</style>

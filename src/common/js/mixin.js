import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playListMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mounted() {
		this.handlePlayList(this.playlist)
	},
	activated() {
		this.handlePlayList(this.playlist)
	},
	watch: {
		playlist(newVal) {
			this.handlePlayList(newVal)
		}
	},
	methods: {
		handlePlayList() {
			throw new Error('component must implement handlePlayList method')
		}
	}
}

export const playerMixin = {
	computed: {
		iconMode() {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
			'sequenceList',
			'currentSong',
			'playlist',
			'mode',
			'favoriteList'
		])
	},
	methods: {
		changeMode() {
			const mode = (this.mode + 1) % 3
			this.setPlayMode(mode)
			let list = null
			if (mode === playMode.random) {
				list = shuffle(this.sequenceList)
			} else {
				list = this.sequenceList
			}
			this.resetCurrentIndex(list)
			this.setPlaylist(list)
		},
		resetCurrentIndex(list) {
			let index = list.findIndex((item) => {
				return item.id === this.currentSong.id
			})
			this.setCurrentIndex(index)
		},
		...mapMutations({
			setPlayingState: 'SET_PLAYING_STATE',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE',
			setPlaylist: 'SET_PLAYLIST'
		}),
		getFavoriteIcon (song) {
			return this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
		},
		toggleFavorite (song) {
			this.isFavorite(song) ? this.deleteFavoriteList(song) : this.saveFavoriteList(song)
		},
		isFavorite (song) {
			const index = this.favoriteList.findIndex((item) => {
				return song.id === item.id
			})
			return index > -1
		},
		...mapActions([
			'saveFavoriteList',
			'deleteFavoriteList'
		])
	}
}

export const searchMixin = {
	data () {
		return {
			query: '',
			refreshDelay: 100
		}
	},
	computed: {
		...mapGetters([
			'searchHistory'
		])
	},
	methods: {
		addQuery(query) {
			this.$refs.searchBox.setQuery(query)
		},
		onQueryChange(query) {
			this.query = query
		},
		blurInput() {
			this.$refs.searchBox.blur()
		},
		saveSearch() {
			this.saveSearchHistory(this.query)
		},
		...mapActions([
			'saveSearchHistory',
			'deleteSearchHistory'
			// 'clearSearchHistory'
		])
	}
}
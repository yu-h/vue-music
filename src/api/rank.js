import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

	const data = Object.assign({}, commonParams, {
		g_tk: '1215063901',
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
	})

	return jsonp(url, data, options)
}
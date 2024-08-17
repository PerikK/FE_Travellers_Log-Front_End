import { url } from './url.js'


async function login(username, password) {
	return await post('login', { username, password }, false)
}

async function register(username, password) {
	const res = await post('users', { username, password }, false)

	if (res.data.error) {
		return res
	}
	return await login(username, password)
}

async function getUser(id) {
	return await get(`users/${id}`)
}


const getVisits = async () => {
	const res = await get('visits')
	return res.data.visits
}

async function createVisit(content) {
	return await post('visits', { content })
}

async function post(endpoint, data, auth = true) {
	return await request('POST', endpoint, data, auth)
}

async function get(endpoint, auth = true) {
	return await request('GET', endpoint, null, auth)
}


async function request(method, endpoint, data, auth = true) {
	const opts = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
	}

	if (method.toUpperCase() !== 'GET') {
		opts.body = JSON.stringify(data)
	}

	if (auth) {
		opts.headers['Authorization'] = `Bearer ${localStorage.getItem(
			'token'
		)}`
	}

	const response = await fetch(`${url}/${endpoint}`, opts)

	return response.json()
}

export {
	register,
	login,
	getUser,
	getVisits,
	createVisit,
}

let getCurrentUser = () => {
	return localStorage.currentUser ? JSON.parse(localStorage.currentUser) : {}
}
export {getCurrentUser};
export function dontCallMe() {
	console.log('bad')
}

export function testDoCallMe() {
	return 1 + 1
}

export async function testAsyncText() {
	return 1 + 1
}

export function testFail() {
	throw new Error('sample error')
}

// export async function testAsyncFail() {
// 	throw new Error('sample error')
// }
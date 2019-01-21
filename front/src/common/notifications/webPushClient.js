import { postReq } from '../restApi';
const publicVapidKey = "BLl0WCuUk_v1onw7estGTyN2Fpg7KIquZVOPRcSXvRiFMoawvQBCEeCSqFChU1Yetq5jv0-W_XeSbL6zPBJ9v4A";


/*if ('serviceWorker' in navigator) {
	console.log('Registering service worker');
	run().catch(error => console.error(error));
}*/

export const run = async () => {
	console.log('Registering service worker');
	const registration = await navigator.serviceWorker.
	register('/worker.js', {scope: '/'});
	console.log('Registered service worker');

	console.log('Registering push');
	const subscription = await registration.pushManager.
	subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});
	console.log('Registered push');

	console.log('Sending push');
	await postReq('/subscribe', subscription);
	console.log('Sent push');
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	.replace(/\-/g, '+')
	.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
angular
	.module('storage.service', ['LocalStorageModule'])
	.config(function (localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('storage.services').setStorageType('localStorage');
	})
	.factory('StorageService', StorageService);

function StorageService(localStorageService) {
	var localStorageSupported = false;
	var localStorage = localStorageService;
	if (localStorageService.isSupported) {
		localStorageSupported = true;
	}

	return {
		add: add,
		addObject: addObject,
		get: get,
		getObject: getObject,
		getAllItems: getAllItems,
		getAllValues: getAllValues,
		remove: remove,
		clear: clear
	};

	// add value to storage
	function add(key, item) {
		if (localStorageSupported) {
			localStorage.set(key, item);
		}
	}

	function addObject(key, data) {
		const jsonData = JSON.stringify(data);
		if (localStorageSupported) {
			localStorage.set(key, jsonData);
		}
	}

	function getObject(key) {
		const item = localStorage.get(key);
		return JSON.parse(item);
	}

	// get all values from storage (all items)
	function getAllItems() {
		const list = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			const value = localStorage.get(key);

			list.push(
				new StorageItem({
					key: key,
					value: value
				})
			);
		}

		return list;
	}

	// get only all values from localStorage
	function getAllValues() {
		const list = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			const value = localStorage.getItem(key);

			list.push(value);
		}

		return list;
	}

	// get one item by key from storage
	function get(key) {
		if (localStorageSupported) {
			const item = localStorage.getItem(key);
			return item;
		} else {
			return null;
		}
	}

	// remove value from storage
	function remove(key) {
		if (localStorageSupported) {
			localStorage.removeItem(key);
		}
	}

	// clear storage (remove all items from it)
	function clear() {
		if (localStorageSupported) {
			localStorage.clearAll();
		}
	}
}
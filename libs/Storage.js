import AsyncStorage from '@react-native-async-storage/async-storage';


class Storage {
    async set(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
            console.log(key, value)
        } catch (e) {
            // saving error
        }
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key)
            console.log(key, value)
            return value
        } catch (e) {
            // saving error
        }
    }

    async remove(key) {
        try {
            const value = await AsyncStorage.removeItem(key)
            console.log(key, value)
            return value
        } catch (e) {
            // saving error
        }
    }
}

export default new Storage();
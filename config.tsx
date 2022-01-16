const HOST = "localhost";
const PORT = "5000";
const api = `http://${HOST}:${PORT}`

export const APIConfig = {
    'api': {
        'get_machine': api +  `/machine/get_by_owner/{owner_id}`,
        'get_sensor': api +  `/sensor/get_by_owner/{owner_id}`,
        'get_sensor_value': api +  `/sensor/get_value/{sensor_id}`
        // 
        
    }
}

const HOST = "192.168.0.100";
const PORT = "5000";
const api = `http://${HOST}:${PORT}`

export const APIConfig = {
    'api': {
        'get_farms': api +  `/farm/get_by_owner/{owner_id}`,
        'get_machine': api +  `/machine/get_by_owner/{owner_id}`,
        'get_sensor': api +  `/sensor/get_by_owner/{owner_id}`,
        'get_rule': api +  `/rule/get_by_owner/{owner_id}`,
        'get_sensor_value': api +  `/sensor/get_value/{sensor_id}`,
        'get_machine_value': api +  `/machine/get_value/{machine_id}`,
        'set_machine_state': api +  `/machine/set_state`,
        'set_rule_state': api +  `/rule/set_state`,
        'create_rule': api +  `/rule/create`,
        'update_rule': api +  `/rule/update`,
        'delete_rule': api +  `/rule/delete/{_id}`
        // 
        
    }
}

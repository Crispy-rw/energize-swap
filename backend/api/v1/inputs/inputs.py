''' Input Validation Classes '''
from api.v1.validations import Validations


# Registration validations
REGISTER_DRIVER = [
    {'name': [('string', True), ('minimum', 1),
                  ('maximum', 30), ('required', True)]},
    {'email': [('minimum', 6), ('maximum', 30),
               ('required', True), ('email', True)]},
    {'phone': [('minimum', 8), ('maximum', 10), ('required', True)]},
    {'address': [('minimum', 6), ('maximum', 30)]},
    {'license_number': [('minimum', 6), ('maximum', 30)]},
    {'license_expiry': [('minimum', 6), ('maximum', 30)]},
    {'motocycle_make': [('minimum', 6), ('maximum', 30)]},
    {'motocycle_model': [('minimum', 6), ('maximum', 30)]},
    {'motocycle_year': [('minimum', 2), ('maximum', 4), ('number', True)]},
]
# Login validation
LOGIN_RULES = [
    {'email': [('minimum', 6), ('maximum', 30),
               ('required', True), ('email', True)]},
    {'password': [('minimum', 6), ('required', True)]},
    {'station': [('minimum', 1)]}
]
# Change password validations
REGISTER_STATION = [
    {'name': [('minimum', 3), ('maximum', 30), ('required', True)]},
    {'location': [('minimum', 3), ('maximum', 30), ('required', True)]},
]
# Reset password validations
REGISTER_BATTERY_RULES = [
    {'battery_type': [('minimum', 3), ('maximum', 14),
               ('required', True)]},
    {'manufacture_date': [('minimum', 2), ('maximum', 4), ('required', True)]},
    {'serial_number': [('minimum', 5), ('maximum', 30),
                          ('required', True)]},
    {'station': [('minimum', 1), ('maximum',10),
                          ('required', True)]},
]

# Reset password validations
REGISTER_SWAP_RULE = [
    {'battery': [('required', True), ('minimum', 1),
               ('maximum', 10)]},
    {'driver': [('required', True), ('minimum', 1),
               ('maximum', 10)]}
]

REGISTER_MOVEMENT_RULE = [
    {'lat': [('required', True), ('number', True)]},
    {'long': [('required', True), ('number', True)]},
    {'battery_percentage': [('required', True), ('minimum', 1),
               ('maximum', 2)]}
]


def validate(inputs, all_rules):
    ''' Register validation method '''
    error_bag = {}
    valid = Validations(inputs)
    for rules in all_rules:
        for key in rules:
            rule_key = key
            for rule in rules[rule_key]:
                execute = getattr(valid, rule[0])(rule_key, rule[1])
                if execute is True:
                    pass
                if execute is not True:
                    if rule_key in error_bag:
                        error_bag[rule_key] = execute
                    else:
                        error_bag[rule_key] = []
                        error_bag[rule_key].append(execute)
    if len(error_bag) != 0:
        return error_bag
    return True

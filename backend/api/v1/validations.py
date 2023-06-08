'''
Validations Methods Class
'''

import re


class Validations():
    '''Validations class'''

    def __init__(self, all_inputs):
        ''' All inputs dictionary should be available to the class'''
        for key, value in all_inputs.items():
            if (all_inputs[key] is not None and
                    not isinstance(all_inputs[key], int)):
                if str(all_inputs[key]).strip() == '':
                    all_inputs[key] = None
        self.all = all_inputs

    def string(self, key, string):
        '''Check if input is a string'''
        if key in self.all and self.all[key] is not None:
            if not re.match(r"[^[a-zA-Z0-9]+$", str(self.all[key])):
                return True
            return key.capitalize() + " should be string"
        return True
    
    def number(self, key, number):
        '''Check if input is a number'''
        if key in self.all and self.all[key] is not None:
            if re.match(r"^[+\-]?(\d+(\.\d*)?|\.\d+)?$", str(self.all[key])):
                return True
            return key + " should be a number"
        return True

    def minimum(self, key, minimum):
        '''Check required character size'''
        if key in self.all and self.all[key] is not None:
            if len(str(self.all[key])) < int(minimum):
                return "{} should not be less than {} characters".format(
                    key.capitalize(), str(minimum))
            return True
        return True

    def maximum(self, key, maximum):
        '''Check required character size'''
        if key in self.all and self.all[key] is not None:
            if len(str(self.all[key])) > int(maximum):
                return "{} should not be greater than {} characters".format(
                    key.capitalize(), str(maximum)
                )
            return True
        return True

    def email(self, key, email):
        '''Check input is an email'''
        if key in self.all and self.all[key] is not None:
            if not re.match(r"[^@\s]+@[^@\s]+\.[a-zA-Z]+$", self.all[key]):
                return "Invalid email address"
            return True
        return True

    def required(self, key, is_required=True):
        '''Check input it is required'''
        if key in self.all:
            if self.all[key] is None or str(self.all[key]).strip() == '':
                return key.capitalize() + " should not be empty"
            return True
        return key.capitalize() + " is required"

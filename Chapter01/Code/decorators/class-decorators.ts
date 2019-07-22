let classUser = {user: "peter", roles : [{role:"user"}, {role:"admi1n"}] };

function IsInRoleClass(role : string) : boolean {
    return classUser.roles.some(r => r.role === role);
}

function RoleClass(role : string) {
    return function(constructor : Function) {
        if (!IsInRoleClass(role)) {
            throw new Error(`The user is not authorised to access this class`);
        }
    }
}
@RoleClass("admin")
class RestrictedClass {
    constructor() {
        console.log(`Inside the constructor`);
    }
    Validate() {
        console.log(`Validating`);
    }
}

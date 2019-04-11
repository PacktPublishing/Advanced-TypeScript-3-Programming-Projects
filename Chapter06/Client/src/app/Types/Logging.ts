export function Log() {
  return function(target: Object,
                  propertyName: string,
                  propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;
    propertyDesciptor.value = function(...args: unknown[]) {
      const params = args.map(arg => JSON.stringify(arg)).join();
      const result = method.apply(this, args);
      if (args && args.length > 0) {
        console.log(`Calling ${propertyName} with ${params}`);
      } else {
        console.log(`Calling ${propertyName}. No parameters present.`)
      }
      return result;
    };
    return propertyDesciptor;
  }
}

permit = (...allowed) => {
	//const isAllowed = (role) => allowed.indexOf(role) > -1;
	const isAllowed = (roles) => {
		var found = false;
		roles.forEach((role) => {
			if (allowed.find((x) => x == role)) {
				found = true;
				return;
			}
		});
		return found;
	};

	// return a middleware
	return (request, response, next) => {
		if (request.userId && isAllowed(request.roles)) next();
		else {
			// role is allowed, so continue on the next middleware
			response.status(401).json({ message: 'Unauthorized' }); // user is forbidden
		}
	};
};
module.exports = permit;

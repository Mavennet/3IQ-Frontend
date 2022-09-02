export function getButtonRoute(button, allRoutes) {
    const route = retrieveButtonRoute(button, allRoutes);

    return {
        slug: { current: route.slug.current }
    }
}


function retrieveButtonRoute(button, allRoutes) {
    for (let i = 0; i < allRoutes.length; i++) {
        if (allRoutes[i]._id === button.route._ref) {
            return allRoutes[i];
        }            
    }
}
angular
    .module('inbox.component', [])
    .component('inboxview', {
        controller: function ($rootScope, $scope, InboxService, AuthService) {
            if (AuthService.userIsLogin()) {
                InboxService.get();
                $scope.all = InboxService.all;
                $scope.unread = () => {
                    var result = InboxService.unread();
                    $scope.all = InboxService.all;
                    return result;
                }
            }
            $rootScope.$on("reciveMessage", (payload) => {
                InboxService.subscribe(payload);
            });
        },
        templateUrl: 'apps/components/templates/inbox.html'
    })
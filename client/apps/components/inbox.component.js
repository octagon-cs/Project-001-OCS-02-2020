angular
    .module('inbox.component', [])
    .component('inboxview', {
        controller: function ($rootScope, $scope, InboxService, AuthService, $state) {
            AuthService.profile().then(prof=>{
                $scope.profile = prof;
                InboxService.get();
                $scope.all = InboxService.all;
                $scope.unread = () => {
                    var result = InboxService.unread();
                    $scope.all = InboxService.all;
                    return result;
                }
            });
            $scope.Inbox = function(){
                $state.go($scope.profile.rolename + "-inbox");
            }

            $rootScope.$on("reciveMessage", (payload) => {
                InboxService.subscribe(payload);
            });
        },
        templateUrl: 'apps/components/templates/inbox.html'
    })
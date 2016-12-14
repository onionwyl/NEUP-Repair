/**
 * Created by VOID001 on 01/12/2016.
 */

var myApp = angular.module('neupRepair', [
    'ui.router',
    'navbar',
    'welcome',
    'order',
    'orderList'
]);

// UI-Router的版本很重要，不然就没法用component routing了
myApp.config(function($stateProvider){
    var listState = {
        name: 'orders',
        url: '/orders',
        params: {
            page: 1
        },
        component: 'orderList',
        resolve: {
            orders: function ($http, $stateParams) {
                orders = $http.get(host + '/api/v1/orders?page='+$stateParams.page).then(function(resp){
                    return resp.data;
                });
                return orders;
            }
        }
    };
    
    var specOrderState = {
        name: 'order',
        url: '/orders/{secretID}',
        component: 'order',
        resolve: {
            secretID: function($http, $stateParams) {
                //order = $http.get(host+'/api/v1/orders/'+$stateParams.secretID).then(function(resp){
                //    return resp;
                //});
                //return order;
                return $stateParams.secretID;
            }
        },
        // Here we change the navbar style when route exit
        onExit: function(){
            $("#nav").removeClass("green");
            $("#nav").removeClass("red");
            $("#nav").addClass("blue");
        }
    };
    
    var homeState = {
        name: 'home',
        url: '',
        component: 'welcome'
    };
    
    var adminState = {
        name: 'admin',
        url: '/admin',
        template: '<h1>Admin</h1>'
    };
    
    $stateProvider.state(homeState);
    $stateProvider.state(listState);
    $stateProvider.state(adminState);
    $stateProvider.state(specOrderState);
});

myApp.run(['$trace', function($trace) {
    //Fire an Welcome Image
    console.log(
        ' _   _ _____ _   _ ____    ____                  _' + '\n' +
        '| \\ | | ____| | | |  _ \\  |  _ \\ ___ _ __   __ _(_)_ __' + '\n' +
        '|  \\| |  _| | | | | |_) | | |_) / _ \\ \'_ \\ / _` | | \'__|' + '\n' +
        '| |\\  | |___| |_| |  __/  |  _ <  __/ |_) | (_| | | |' + '\n' +
        '|_| \\_|_____|\\___/|_|     |_| \\_\\___| \.__/ \\__,_|_|_|' + '\n' +
        '                                    |_|' + '\n'
    );
    console.log('噫，被你发现惹=w=，欢迎小伙伴们加入先锋网络中心\n网络部: http://github.com/NEUP-Net-Depart/\n硬件部: http://url.here\n运维部: http://url.here')
    
    $trace.enable('TRANSITION');
   
}]);


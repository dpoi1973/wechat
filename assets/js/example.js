angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $http, $uibModal, $log) {

  $scope.users = {};
  $scope.sex = ['未知', '男', '女'];
  $http.get('/weixinmain/getPersons').success(function (res) {
    $scope.users = res;
  });

  var $ctrl = this;
  //  $ctrl.items = ['item1', 'item2', 'item3'];
  $http.get('/weixinmain/getAllPrivateTemplate').success(function (res) {
    $ctrl.items = res.template_list;
  });

  $ctrl.animationsEnabled = true;
  $ctrl.open = function (size, openid) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return $ctrl.items;
        },
        openid: function () {
          return openid;
        }
      }
    });
  };
});
// Please note that $uibModalInstance represents a modal window (instance) dependency.
// 请注意 uibmodalinstance代表一个模态窗口（实例）的依赖。
// It is not the same as the $uibModal service used above.
// 它是不一样的 uibmodal服务上面使用。
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($sce, $uibModalInstance, items, openid) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.openid = openid;
  $ctrl.selected = {
    item: "请先选择模板！！",
    message: "你的还没有选择模板编号！"
  };

  $ctrl.change = function (obj) {
    $ctrl.selected.item = obj.selectedName;
    for (var i = 0; i < $ctrl.items.length; i++) {
      if ($ctrl.items[i].template_id == obj.selectedName) {
        var strHtml = $ctrl.items[i].content;
        strHtml = strHtml.replace(/{{/g, "<input type='text' name='");
        strHtml = strHtml.replace(/.DATA}}/g, "' value='请输入值'/>");
        $ctrl.selected.message = $sce.trustAsHtml(strHtml);
        break;
      }
    }
  };
  // 确认事件
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };
  // 取消事件
  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
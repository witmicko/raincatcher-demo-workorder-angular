var sampleWorkorders = require('./sample_workorders')();
var sampleWorkflows = require('./sample_workflows')();
var sampleUsers = require('./sample_users')();


function setupSubscribers(mediator) {
  mediator.subscribe('wfm:workorders:list', function() {
    mediator.publish('done:wfm:workorders:list', sampleWorkorders);
  });

  mediator.subscribe('wfm:results:list', function() {
    mediator.publish('done:wfm:results:list', []);
  });

  mediator.subscribe('wfm:workorders:read', function(data) {
    var workorderToRead = _.find(sampleWorkorders, function(workorder) {
      return workorder.id === data.id;
    });

    mediator.publish('done:wfm:workorders:read:' + data.topicUid, workorderToRead);
  });

  mediator.subscribe('wfm:workflows:read', function(data) {
    var workflowToRead = _.find(sampleWorkflows, function(workflow) {
      return workflow.id === data.id;
    });
    mediator.publish('done:wfm:workflows:read:' + data.topicUid, workflowToRead);
  });

  mediator.subscribe('wfm:workflows:list', function() {
    mediator.publish('done:wfm:workflows:list', sampleWorkflows);
  });

  mediator.subscribe('wfm:users:read', function(data) {
    var userToRead = _.find(sampleUsers, function(user) {
      return user.id === data.id;
    });
    mediator.publish('done:wfm:users:read:' + data.id, userToRead);
  });

  mediator.subscribe('wfm:users:list', function() {
    mediator.publish('done:wfm:users:list', sampleUsers);
  });

  mediator.subscribe('wfm:workorders:create', function(data) {
    delete data.workorderToCreate.$$hashKey;
    data.workorderToCreate.id = data.topicUid;
    sampleWorkorders.push(data.workorderToCreate);
    mediator.publish('done:wfm:workorders:create:' + data.topicUid, data.workorderToCreate);
  });

  mediator.subscribe('wfm:workorders:remove', function(data) {
    _.remove(sampleWorkorders, function(workorder) {
      return workorder.id === data.id;
    });
    mediator.publish('done:wfm:workorders:remove:' + data.topicUid, {});
  });
}

module.exports = {
  setupSubscribers: setupSubscribers
};
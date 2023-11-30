"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromiseUtils = /** @class */ (function () {
    function PromiseUtils() {
    }
    /**
     * Taken from https://stackoverflow.com/questions/38385419/throttle-amount-of-promises-open-at-a-given-time
    * Performs a list of callable actions (promise factories) so that only a limited
    * number of promises are pending at any given time.
    *
    * @param listOfCallableActions An array of callable functions, which should
    *     return promises.
    * @param limit The maximum number of promises to have pending at once.
    * @returns A Promise that resolves to the full list of values when everything is done.
    */
    PromiseUtils.throttleActions = function (listOfCallableActions, limit) {
        // We'll need to store which is the next promise in the list.
        var i = 0;
        var resultArray = new Array(listOfCallableActions.length);
        // Now define what happens when any of the actions completes. Javascript is
        // (mostly) single-threaded, so only one completion handler will call at a
        // given time. Because we return doNextAction, the Promise chain continues as
        // long as there's an action left in the list.
        function doNextAction() {
            if (i < listOfCallableActions.length) {
                // Save the current value of i, so we can put the result in the right place
                var actionIndex_1 = i++;
                var nextAction = listOfCallableActions[actionIndex_1];
                return Promise.resolve(nextAction())
                    .then(function (result) {
                    resultArray[actionIndex_1] = result;
                    return;
                }).then(doNextAction);
            }
        }
        // Now start up the original <limit> number of promises.
        // i advances in calls to doNextAction.
        var listOfPromises = [];
        while (i < limit && i < listOfCallableActions.length) {
            listOfPromises.push(doNextAction());
        }
        return Promise.all(listOfPromises).then(function () { return resultArray; });
    };
    return PromiseUtils;
}());
exports.PromiseUtils = PromiseUtils;

define(['src/graph_search/node'], function(Node){

  describe("Node", function(){
    var initialNode,
        problem;

    beforeEach(function(){
      problem = {
        initialState: 'a',
        possibleActions: function(state){
          return {'b': true, 'c': true};
        },
        result: function(state, action){
          return state + action;
        },
        goalReached: function(state){
          return (state === "abb");
        },
        stepCost: function(state, action){
          return 1;
        },
        goalDistanceHeuristic: function(state){
          return state.length;
        }
      };

      initialNode = Node.initialNode(problem);
    });

    describe(".child(action)", function(){
      it("should return a node with the correct attributes", function(){
        var child = initialNode.child("b");
        expect(child.problem).toEqual(problem);
        expect(child.state).toEqual("ab");
        expect(child.action).toEqual("b");
        expect(child.parent).toEqual(initialNode);
        expect(child.pathCost).toEqual(1);

        var grandChild = child.child("c");
        expect(grandChild.problem).toEqual(problem);
        expect(grandChild.state).toEqual("abc");
        expect(grandChild.action).toEqual("c");
        expect(grandChild.parent).toEqual(child);
        expect(grandChild.pathCost).toEqual(2);
      });
    });

    describe(".priority()", function(){
      it("should return the correct value", function(){
        expect(initialNode.priority()).toEqual(1); //0 + "a".length
        expect(initialNode.child("b").priority()).toEqual(3); //1 + "ab".length
        expect(initialNode.child("b").child("c").priority()).toEqual(5); //2 + "abc".length
      });
    });
  });
});

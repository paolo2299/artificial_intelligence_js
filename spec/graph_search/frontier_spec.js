define(['graph_search/frontier'], function(Frontier){

  describe("Frontier", function(){
    var frontier,
        node;

    beforeEach(function(){
      frontier = new Frontier();
      node1 = {
        state: "test1",
        priority: function(){return 1;}
      };
      node2 = {
        state: "test2",
        priority: function(){return 2;}
      };
    });

    describe(".add(node)", function(){
      it("should add the node", function(){
        frontier.add(node1);
        expect(frontier.getNodeWithState("test1")).toEqual(node1);
      });

      it("should raise if the same node is added twice", function(){
        frontier.add(node1);
        expect(function(){frontier.add(node1)}).toThrow();
      });

      it("should be able to re-add a deleted node", function(){
        frontier.add(node1);
        frontier.delete(node1);
        expect(frontier.isEmpty()).toBe(true);
        expect(frontier.pop()).toBeNull();
        frontier.add(node1);
        expect(frontier.isEmpty()).toBe(false);
        expect(frontier.pop()).toEqual(node1);
      });
    });

    describe(".isEmpty()", function(){
      it("should be true when initialized", function() {
        expect(frontier.isEmpty()).toBe(true);
      });

      it("should be false after adding a node", function() {
        expect(frontier.add(node1).isEmpty()).toBe(false);
      });

      it("should be true after adding and deleting a node", function() {
        expect(frontier.add(node1).delete(node1).isEmpty()).toBe(true);
      });
    });

    describe(".delete()", function(){
      it("should successfully delete a node", function(){
        frontier.add(node1);
        expect(frontier.getNodeWithState(node1.state)).toEqual(node1);
        frontier.delete(node1);
        expect(frontier.getNodeWithState(node1.state)).toBeNull();
      });
    });

    describe(".pop()", function(){
      it("should return null when frontier is empty", function(){
        expect(frontier.pop()).toBeNull();
      });

      it("should empty the frontier when it contains only one node", function(){
        frontier.add(node1);
        expect(frontier.isEmpty()).toBe(false);
        frontier.pop()
        expect(frontier.isEmpty()).toBe(true);
      });

      it("should remove and return the lowest priority node when frontier contains multiple nodes", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.pop()).toEqual(node1);
      });

      it("should not rely on the order the nodes are added", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.pop()).toEqual(node1);

        frontier = new Frontier();
        frontier.add(node2);
        frontier.add(node1);
        expect(frontier.pop()).toEqual(node1);
      });

      it("should not return deleted nodes", function(){
        frontier.add(node1);
        frontier.add(node2);
        frontier.delete(node2);
        expect(frontier.pop()).toEqual(node1);
        expect(frontier.pop()).toBeNull();
      });
    });
    
    describe(".top()", function(){
      it("should return null when frontier is empty", function(){
        expect(frontier.top()).toBeNull();
      });

      it("should return but not remove the highest priority node when frontier contains multiple nodes", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.top()).toEqual(node1);
        //node2 should still be in frontier
        expect(frontier.top()).toEqual(node1);
      });

      it("should not rely on the order the nodes are added", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.top()).toEqual(node1);

        frontier = new Frontier();
        frontier.add(node2);
        frontier.add(node1);
        expect(frontier.top()).toEqual(node1);
      });

      it("should not return deleted nodes", function(){
        frontier.add(node1);
        frontier.add(node2);
        frontier.delete(node2);
        expect(frontier.top()).toEqual(node1);
      });
    });

    describe(".getNodeWithState(state)", function(){
      it("should return the correct node", function(){
        frontier.add(node1);
        expect(frontier.getNodeWithState(node1.state)).toEqual(node1);
      });

      it("should return null if no such node exists", function(){
        expect(frontier.getNodeWithState(node1.state)).toBeNull();
        frontier.add(node1);
        expect(frontier.getNodeWithState(node2.state)).toBeNull();
      });

      it("should return null if a node has been deleted", function(){
        frontier.add(node1);
        frontier.delete(node1);
        expect(frontier.getNodeWithState(node1.state)).toBeNull();
      });
    });

  });
});

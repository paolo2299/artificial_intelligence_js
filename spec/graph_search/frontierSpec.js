define(['src/graph_search/frontier'], function(Frontier){

  describe("Frontier", function(){
    var frontier;
    var node;

    beforeEach(function(){
      frontier = new Frontier();
      node1 = {
        state: "test1",
        priority: 1
      };
      node2 = {
        state: "test2",
        priority: 2
      };
    });

    describe(".add(node)", function(){
      it("should add the node", function(){
        frontier.add(node1);
        expect(frontier.getNodeWithState("test1")).toEqual(node1);
      });
    });

    describe(".isEmpty()", function(){
      it("should be true when initialized", function() {
        expect(frontier.isEmpty()).toBe(true);
      });

      it("should be false after adding a node", function() {
        expect(frontier.add(node1).isEmpty()).toBe(false);
      });
    });

    describe(".pop()", function(){
      it("should return undefined when frontier is empty", function(){
        expect(frontier.pop()).toBeUndefined();
      });

      it("should empty the frontier when it contains only one node", function(){
        frontier.add(node1);
        expect(frontier.isEmpty()).toBe(false);
        frontier.pop()
        expect(frontier.isEmpty()).toBe(true);
      });

      it("should remove and return the highest priority node when frontier contains multiple nodes", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.pop()).toEqual(node2);
      });

      it("should not rely on the order the nodes are added", function(){
        frontier.add(node1);
        frontier.add(node2);
        expect(frontier.pop()).toEqual(node2);

        frontier = new Frontier();
        frontier.add(node2);
        frontier.add(node1);
        expect(frontier.pop()).toEqual(node2);
      });
    });
  });
});

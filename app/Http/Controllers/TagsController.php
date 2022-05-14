<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Tags::select('id','tagname','status')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $request->validate([
            'tagname'=>'required',
            'status'=>'required'
        ]);

        try{
            Tags::create($request->post());
            return response()->json(['message'=>'Tag Created Successfully!!']);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json(['message'=>'Something goes wrong while creating a Tag!!'],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function show(Tags $tags){
        return response()->json(['tags'=>$tags]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function edit(Tags $tags)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tags $tags){
        $request->validate([
            'tagname'=>'required',
            'status'=>'required'
        ]);

        try{
            $tags->fill($request->post())->update();
            return response()->json(['message'=>'Tag Updated Successfully!!']);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json(['message'=>'Something goes wrong while updating a Tag!!'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tags $tags){
        try {
            $tags->delete();
            return response()->json(['message'=>'Tag Deleted Successfully!!']);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message'=>'Something goes wrong while deleting a Tag!!']);
        }
    }
}
